import Pagination from "@/components/shared/Pagination";
import Link from 'next/link';

/*
function denied() {
    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1 style={{ color: 'red' }}>Unauthorized</h1>
            <p style={{ fontSize: '18px' }}>You do not have the necessary permissions to access this page.</p>
            <Link href="/login">
                <a style={{ color: 'blue', textDecoration: 'underline' }}>Click here to login</a>
            </Link>
        </div>
    );
}

export default denied;

*/

function Page(){
return (
    <>
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h1 style={{ color: 'red' }}>Unauthorized</h1>
        <p style={{ fontSize: '18px' }}>You do not have the necessary permissions to access this page.</p>
        <Link href="/login">
            <a style={{ color: 'blue', textDecoration: 'underline' }}>Click here to login</a>
        </Link>
    </div>

    <Pagination
        path='denied'
        pageNumber={1}
        isNext={false}
      />
    </>
);
}
export default Page;