const { useRouter } = require("next/router");

const post = () => {
    const router = useRouter();
    const {sno} = router.query;
    return <p>Post: {sno}</p>
}

export default post;