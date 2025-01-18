type NextErrorComponentPropType = {
    error: Error & { digest?: string };
    reset: () => void;
};
