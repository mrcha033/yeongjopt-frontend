import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ChatInterface from './ChatInterface';

// Mock the API call
jest.mock('../api/chat', () => ({
  sendChat: jest.fn()
}));

describe('ChatInterface', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  it('renders initial message', () => {
    render(<ChatInterface />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('sends message and displays response', async () => {
    const mockResponse = {
      choices: [{
        message: {
          content: 'Hi there!'
        }
      }]
    };

    // Mock the API response
    require('../api/chat').sendChat.mockResolvedValue(mockResponse);

    render(<ChatInterface />);
    
    // Type and send a message
    const input = screen.getByPlaceholderText('Type your message...');
    await userEvent.type(input, 'Test message');
    fireEvent.click(screen.getByText('Send'));

    // Check if loading indicator appears
    expect(screen.getByText('Test message')).toBeInTheDocument();

    // Wait for the response
    await waitFor(() => {
      expect(screen.getByText('Hi there!')).toBeInTheDocument();
    });

    // Verify API was called with correct parameters
    expect(require('../api/chat').sendChat).toHaveBeenCalledWith([
      { role: 'user', content: 'Hello' },
      { role: 'user', content: 'Test message' }
    ]);
  });

  it('handles API error gracefully', async () => {
    // Mock API error
    require('../api/chat').sendChat.mockRejectedValue(new Error('API Error'));

    render(<ChatInterface />);
    
    // Type and send a message
    const input = screen.getByPlaceholderText('Type your message...');
    await userEvent.type(input, 'Test message');
    fireEvent.click(screen.getByText('Send'));

    // Wait for error message
    await waitFor(() => {
      expect(screen.getByText('메시지 전송에 실패했습니다. 잠시 후 다시 시도해주세요.')).toBeInTheDocument();
    });

    // Verify the failed message was removed
    expect(screen.queryByText('Test message')).not.toBeInTheDocument();
  });
}); 