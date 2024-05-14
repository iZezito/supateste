
const ContentLoader = ({ loading, noContent, children }) => {
    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );
    }

    if (!children) {
        return <h1 className={'h1'}>{noContent}</h1>;
    }

    return <>{children}</>;
};

export default ContentLoader;
