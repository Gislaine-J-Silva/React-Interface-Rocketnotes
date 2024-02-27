import { useEffect } from "react";

export function UseEnterKey(callback){
    useEffect(() => {
        const handleKeyPress = (event) => {
            if(event.key === 'Enter'){
                callback();
            }
        };

        document.addEventListener('keydown', handleKeyPress);

        return () => {
            document.removeEventListener('keydown', handleKeyPress)
        };
    }, [callback]);
}