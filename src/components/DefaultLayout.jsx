import { Outlet } from 'react-router-dom'
import Navigation from '@/components/Navigation'

const DefaultLayout = () => {
    return (
        <>
            <Navigation />

            <main>
                <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">

                    <Outlet />

                </div>
            </main>

        </>        
    )
}

export default DefaultLayout