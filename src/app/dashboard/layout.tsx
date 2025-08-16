"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LecturerDashboard({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();

    useEffect(() => {
    // Check for login status in localStorage
    const isLoggedIn = localStorage.getItem("lecturer_logged_in");
    if (!isLoggedIn) {
        router.push("/login");
    }
    }, [router]);

    return <>{children}</>;
}
