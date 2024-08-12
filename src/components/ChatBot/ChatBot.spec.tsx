import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import ChatBot from "./index";
import {
  setMessages,
  setLoading,
  setIsOpen,
} from "../../redux/actions/chatBotAction";
import { BOT, ERROR_MESSAGE } from "../../constant";
import * as api from "../../utils/api";

jest.mock("../../utils/api", () => ({
  sendChatMessage: jest.fn(),
}));

const mockStore = configureStore();
const initialState = {
  chatBot: {
    isOpen: true,
    messages: [{ id: Date.now(), user: BOT, text: "Hi, How can I help you?" }],
    loading: false,
    userId: "",
  },
};

describe("ChatBot Component", () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  it("renders the ChatBot component correctly", () => {
    render(
      <Provider store={store}>
        <ChatBot />
      </Provider>
    );

    expect(screen.getByText(/Hey 👋, I'm Ava/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Ask me anything or pick a place to start/i)
    ).toBeInTheDocument();
  });

  it("displays the initial message and loading indicator correctly", () => {
    render(
      <Provider store={store}>
        <ChatBot />
      </Provider>
    );

    expect(screen.getByText(/Hi, How can I help you\?/i)).toBeInTheDocument();
    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
  });

  it("handles sending a new message and receiving a reply", async () => {
    (api.sendChatMessage as jest.Mock).mockResolvedValueOnce(
      "Hello! How can I assist you?"
    );

    render(
      <Provider store={store}>
        <ChatBot />
      </Provider>
    );

    const input = screen.getByPlaceholderText(/Type a message/i);
    const sendButton = screen.getByRole("button", { name: /Send/i });

    fireEvent.change(input, {
      target: { value: "What is the weather today?" },
    });
    fireEvent.click(sendButton);

    await waitFor(() => {
      const actions = store.getActions();
      expect(actions).toContainEqual(
        setMessages(
          expect.arrayContaining([
            expect.objectContaining({ text: "What is the weather today?" }),
            expect.objectContaining({ text: "Hello! How can I assist you?" }),
          ])
        )
      );
      expect(actions).toContainEqual(setLoading(false));
    });
  });

  it("handles sending a message with an error", async () => {
    (api.sendChatMessage as jest.Mock).mockRejectedValueOnce(
      new Error("Network Error")
    );

    render(
      <Provider store={store}>
        <ChatBot />
      </Provider>
    );

    const input = screen.getByPlaceholderText(/Type a message/i);
    const sendButton = screen.getByRole("button", { name: /Send/i });

    fireEvent.change(input, {
      target: { value: "What is the weather today?" },
    });
    fireEvent.click(sendButton);

    await waitFor(() => {
      const actions = store.getActions();
      expect(actions).toContainEqual(
        setMessages(
          expect.arrayContaining([
            expect.objectContaining({ text: "What is the weather today?" }),
            expect.objectContaining({ text: ERROR_MESSAGE }),
          ])
        )
      );
      expect(actions).toContainEqual(setLoading(false));
    });
  });

  it("handles editing a message", () => {
    render(
      <Provider store={store}>
        <ChatBot />
      </Provider>
    );

    const editButton = screen.getByRole("button", { name: /Edit/i });
    fireEvent.click(editButton);

    const input = screen.getByPlaceholderText(/Type a message/i);
    fireEvent.change(input, { target: { value: "Updated message" } });
    const sendButton = screen.getByRole("button", { name: /Send/i });
    fireEvent.click(sendButton);

    expect(screen.getByText(/Updated message/i)).toBeInTheDocument();
  });

  it("handles deleting a message", () => {
    render(
      <Provider store={store}>
        <ChatBot />
      </Provider>
    );

    const deleteButton = screen.getByRole("button", { name: /Delete/i });
    fireEvent.click(deleteButton);

    expect(
      screen.queryByText(/Hi, How can I help you\?/i)
    ).not.toBeInTheDocument();
  });

  it("toggles maximize and minimize state", () => {
    render(
      <Provider store={store}>
        <ChatBot />
      </Provider>
    );

    const maximizeButton = screen.getByAltText("Expand");
    fireEvent.click(maximizeButton);

    expect(screen.getByAltText("Collapse")).toBeInTheDocument();

    fireEvent.click(screen.getByAltText("Collapse"));

    expect(screen.getByAltText("Expand")).toBeInTheDocument();
  });

  it("closes the chat when the close button is clicked", () => {
    render(
      <Provider store={store}>
        <ChatBot />
      </Provider>
    );

    const closeButton = screen.getByAltText("Close");
    fireEvent.click(closeButton);

    const actions = store.getActions();
    expect(actions).toContainEqual(setIsOpen(false));
  });
});
