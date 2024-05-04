import React, { useState, useEffect } from "react";

const NotificationBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await fetch("http://localhost:8080/notifications", {
                    credentials: 'include'
                });
                if (response.ok) {
                    const data = await response.json();
                    setNotifications(data);
                } else {
                    console.error("Failed to fetch notifications:", response.status);
                }
            } catch (error) {
                console.error("Error fetching notifications:", error);
            }
        };
    
        fetchNotifications();
    }, []);
    

    const toggleNotificationBar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            {isOpen && (
                <div className="notification-container">
                <div className="w-full absolute z-10 right-0 h-full overflow-x-hidden transform translate-x-0 transition ease-in-out duration-700" id="notification">
                    <div className="2xl:w-4/12 bg-gray-50 h-screen overflow-y-auto p-8 absolute right-0">
                
                        <div className="w-full p-3 mt-4 bg-white rounded shadow flex-shrink-0">
                            {notifications.map((notification, index) => (
                                <div key={index} className="w-full p-3 mt-4 bg-white rounded flex">
                                    <div className="w-8 h-8 border rounded-full border-gray-200 flex items-center justify-center">
                                        <svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M4.30325 12.6667L1.33325 15V2.66667C1.33325 2.48986 1.40349 2.32029 1.52851 2.19526C1.65354 2.07024 1.82311 2 1.99992 2H13.9999C14.1767 2 14.3463 2.07024 14.4713 2.19526C14.5963 2.32029 14.6666 2.48986 14.6666 2.66667V12C14.6666 12.1768 14.5963 12.3464 14.4713 12.4714C14.3463 12.5964 14.1767 12.6667 13.9999 12.6667H4.30325ZM5.33325 6.66667V8H10.6666V6.66667H5.33325Z" fill="#4338CA" />
                                        </svg>
                                    </div>
                                    <div className="pl-3">
                                        <p className="text-sm leading-none">
                                            <span className="text-indigo-700">{notification}</span>
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            )}
            {/* Notification bar icon */}
            <div className="notification-icon" onClick={toggleNotificationBar}>
                <img width="25" height="25" src="https://img.icons8.com/ios-filled/50/appointment-reminders--v1.png" alt="appointment-reminders--v1"/>
            </div>
        </div>
    );
};

export default NotificationBar;
