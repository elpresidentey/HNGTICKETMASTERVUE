import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import TicketCard from '@/components/TicketCard.vue'

describe('TicketCard', () => {
  const mockTicket = {
    id: 'ticket_123456789',
    title: 'Test Ticket Title',
    description: 'This is a test ticket description',
    status: 'open',
    createdAt: '2023-01-01T10:00:00.000Z',
    updatedAt: '2023-01-02T15:30:00.000Z'
  }

  let wrapper

  beforeEach(() => {
    wrapper = mount(TicketCard, {
      props: {
        ticket: mockTicket
      }
    })
  })

  it('should render ticket information correctly', () => {
    expect(wrapper.find('h3').text()).toBe('Test Ticket Title')
    expect(wrapper.find('p').text()).toBe('This is a test ticket description')
    expect(wrapper.text()).toContain('open')
    expect(wrapper.text()).toContain('ID: ticket_1...')
  })

  it('should have proper accessibility attributes', () => {
    const article = wrapper.find('article')
    const title = wrapper.find('h3')
    const statusIndicator = wrapper.find('[role="img"]')

    expect(article.attributes('aria-labelledby')).toBe(`ticket-title-${mockTicket.id}`)
    expect(title.attributes('id')).toBe(`ticket-title-${mockTicket.id}`)
    expect(statusIndicator.attributes('aria-label')).toBe('Status: open')
  })

  it('should display correct status colors for different statuses', async () => {
    // Test open status (green)
    expect(wrapper.find('.bg-green-500').exists()).toBe(true)
    expect(wrapper.find('.text-green-700').exists()).toBe(true)

    // Test in_progress status (amber)
    await wrapper.setProps({
      ticket: { ...mockTicket, status: 'in_progress' }
    })
    expect(wrapper.find('.bg-amber-500').exists()).toBe(true)
    expect(wrapper.find('.text-amber-700').exists()).toBe(true)

    // Test closed status (gray)
    await wrapper.setProps({
      ticket: { ...mockTicket, status: 'closed' }
    })
    expect(wrapper.find('.bg-gray-500').exists()).toBe(true)
    expect(wrapper.find('.text-gray-700').exists()).toBe(true)
  })

  it('should format status text correctly', async () => {
    await wrapper.setProps({
      ticket: { ...mockTicket, status: 'in_progress' }
    })
    expect(wrapper.text()).toContain('in progress')
  })

  it('should display "No description provided" when description is empty', async () => {
    await wrapper.setProps({
      ticket: { ...mockTicket, description: '' }
    })
    expect(wrapper.text()).toContain('No description provided')
  })

  it('should format dates correctly', () => {
    expect(wrapper.text()).toContain('Created: Jan 1, 2023')
    expect(wrapper.text()).toContain('Updated: Jan 2, 2023')
  })

  it('should not show updated date if same as created date', async () => {
    await wrapper.setProps({
      ticket: { ...mockTicket, updatedAt: mockTicket.createdAt }
    })
    
    const updatedText = wrapper.text().match(/Updated:/g)
    expect(updatedText).toBeNull()
  })

  it('should emit edit event when edit button is clicked', async () => {
    const editButtons = wrapper.findAll('button[aria-label*="Edit"]')
    await editButtons[0].trigger('click')

    expect(wrapper.emitted('edit')).toBeTruthy()
    expect(wrapper.emitted('edit')[0]).toEqual([mockTicket])
  })

  it('should emit delete event when delete button is clicked', async () => {
    const deleteButtons = wrapper.findAll('button[aria-label*="Delete"]')
    await deleteButtons[0].trigger('click')

    expect(wrapper.emitted('delete')).toBeTruthy()
    expect(wrapper.emitted('delete')[0]).toEqual([mockTicket])
  })

  it('should have proper focus states for interactive elements', () => {
    const buttons = wrapper.findAll('button')
    
    buttons.forEach(button => {
      expect(button.classes()).toContain('focus:outline-none')
      expect(button.classes()).toContain('focus:ring-2')
    })
  })

  it('should handle invalid date gracefully', async () => {
    await wrapper.setProps({
      ticket: { ...mockTicket, createdAt: 'invalid-date' }
    })
    
    expect(wrapper.text()).toContain('Invalid Date')
  })

  it('should truncate long ticket ID in display', () => {
    const idMatch = wrapper.text().match(/ID: ([^E]+)/)
    expect(idMatch).toBeTruthy()
    const idText = idMatch[1].trim()
    expect(idText).toContain('...')
  })

  it('should have hover effects on interactive elements', () => {
    const card = wrapper.find('article')
    const buttons = wrapper.findAll('button')

    expect(card.classes()).toContain('hover:shadow-lg')
    expect(card.classes()).toContain('hover:-translate-y-1')
    
    buttons.forEach(button => {
      expect(button.classes()).toContain('hover:scale-110')
    })
  })
})