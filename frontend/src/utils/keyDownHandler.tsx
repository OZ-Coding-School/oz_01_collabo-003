export const handleEnterKeyPress = (
  callback: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => Promise<void>
) => {
  return (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      callback(e as unknown as React.MouseEvent<HTMLButtonElement, MouseEvent>);
    }
  };
};
export const handleSubmitKeyPress = (callback: React.FormEventHandler) => {
  return (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      callback(e as unknown as React.MouseEvent<HTMLButtonElement, MouseEvent>);
    }
  };
};
