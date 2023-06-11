export interface ChatInputBoxProps {
  value: string;
  setNewValue: any;
  onSubmit: (newMessage: string) => void;
}
