from pydantic import BaseModel, validator


class ChatResponse(BaseModel):
    """Chat response schema."""

    sender: str
    message: str
    type: str

    @validator("sender")
    def sender_must_be_bot_or_you(cls, v: str) -> str:
        """
        Validate the sender field.

        Parameters:
            - v (str): The value of the sender field.

        Returns:
            str: The validated sender value.

        Raises:
            ValueError: If the sender is not "bot" or "you".
        """
        if v not in ["bot", "you"]:
            raise ValueError("sender must be bot or you")
        return v

    @validator("type")
    def validate_message_type(cls, v: str) -> str:
        """
        Validate the type field.

        Parameters:
            - v (str): The value of the type field.

        Returns:
            str: The validated type value.

        Raises:
            ValueError: If the type is not one of "start", "stream", "end", "error", "info".
        """
        if v not in ["start", "stream", "end", "error", "info"]:
            raise ValueError("type must be start, stream or end")
        return v
