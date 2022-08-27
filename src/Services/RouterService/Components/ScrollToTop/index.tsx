import { useEffect } from "react";
import { useLocation } from "react-router";

const ScrollToTop: React.FC = (): JSX.Element => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }, [pathname]);

    return (<></>)
}

export default ScrollToTop;
