export const formatDateTime = (inputDate) => {
    // convert to a readable format: March 12, 2:00:00 PM && March 12, 2:00:00PM
    const now = new Date();
    const date = new Date(inputDate)
    const isSameYear = date.getFullYear() === now.getFullYear();

    const formattedDate = date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        ...(isSameYear ? {} : {year: "numeric"}), // Add the year only if it's not the same year
    });

    const formattedTime = date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
    });

    return `${formattedDate}, ${formattedTime}`;
};