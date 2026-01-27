const Auth = {
    // Check if user is logged in
    checkSession: () => {
        const user = localStorage.getItem('sgpc_user');
        if (!user) {
            // Redirect to login page if no user found
            // Determine path to index.html relative to current location
            // If we are in /html/, we go up one level
            window.location.href = '../index.html';
        }
        return JSON.parse(user);
    },

    // Save user session
    login: (userData) => {
        localStorage.setItem('sgpc_user', JSON.stringify(userData));
    },

    // Clear session and logout
    logout: () => {
        localStorage.removeItem('sgpc_user');
        window.location.href = '../index.html';
    },

    // Get current user data
    getUser: () => {
        const user = localStorage.getItem('sgpc_user');
        return user ? JSON.parse(user) : null;
    }
};

// Auto-check session when this script is loaded, 
// BUT only if we are NOT on the login page (index.html).
// A simple check is to see if we are in the 'html' directory.
if (window.location.pathname.includes('/html/')) {
    Auth.checkSession();
}
