import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { waitFor, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import PreApp from './index';
import * as api from '../../utils/api';
import { setUserId, setIsOpen } from '../../redux/actions/chatBotAction';
import { BOT } from '../../constant';

interface Message {
    id: number;
    user: string;
    text: string;
  }
  
  interface ChatState {
    isOpen: boolean;
    messages: Message[];
    loading: boolean;
    userId:string;
  }
  
  const initialState = {
    chatBot: {
      isOpen: false,
      messages: [{ id: Date.now(), user: BOT, text: 'Hi, How can I help you?' }],
      loading: false,
      userId: "",
    },
  };

  const mockStore = configureStore()
  const dogStore = mockStore(initialState)

jest.mock('../../utils/api', () => ({
  createUser: jest.fn(),
}));

describe('PreApp Component', () => {

  it('renders the header and content correctly', () => {
    render(
      <Provider store={dogStore}>
        <PreApp />
      </Provider>
    );

    expect(screen.getByText(/Automate Your Outbound With an All-In-One, AI-First Platform/i)).toBeInTheDocument();
    expect(screen.getByText(/Powered by AI Employees/i)).toBeInTheDocument();
  });

  it('shows email input if userId is not present', () => {
    render(
      <Provider store={dogStore}>
        <PreApp />
      </Provider>
    );

    expect(screen.getByPlaceholderText(/Please enter a valid email to enable the chatbot/i)).toBeInTheDocument();
  });

  it('dispatches setUserId when email is submitted', async () => {
    const mockUserId = '12345767';
    (api.createUser as jest.Mock).mockResolvedValueOnce({ data: { user_id: mockUserId } });

    render(
      <Provider store={dogStore}>
        <PreApp />
      </Provider>
    );

    const emailInput = screen.getByPlaceholderText(/Please enter a valid email to enable the chatbot/i);
    const submitButton = screen.getByRole('button', { name: /Submit/i });

    userEvent.type(emailInput, 'test@example.com');
    userEvent.click(submitButton);

    await waitFor(() => {
      const actions = dogStore.getActions();
      expect(actions).toContainEqual(setUserId(mockUserId));
    });
  });

  it('shows chatbot icon when userId is present', () => {

    render(
      <Provider store={dogStore}>
        <PreApp />
      </Provider>
    );

    expect(screen.getByAltText('Chatbot Icon')).toBeInTheDocument();
  });

  it('dispatches setIsOpen when chatbot icon is clicked', () => {

    render(
      <Provider store={dogStore}>
        <PreApp />
      </Provider>
    );

    const chatbotIcon = screen.getByAltText('Chatbot Icon');
    userEvent.click(chatbotIcon);

    const actions = dogStore.getActions();
    expect(actions).toContainEqual(setIsOpen(true));
  });
});
