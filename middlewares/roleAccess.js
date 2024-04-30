const roleAccess = (userRole, endpoint, method) => {
    if (endpoint === '/users' && userRole === 'superadmin') {
        return true;
    } else if (endpoint === '/quizzes' && (userRole === 'superadmin' || userRole === 'user')) {
        return true;
    } else if (endpoint === '/quizzes/exam' && (userRole === 'superadmin' || userRole === 'admin' || userRole === 'user')) {
        return true;
    } else if (endpoint === '/quizzes/exam/:id' && (userRole === 'superadmin' || userRole === 'admin' || userRole === 'user')) {
        return true;
    } else if (endpoint === '/quizzes/publish/:id' && (userRole === 'superadmin' || userRole === 'user')) {
        return true;
    } else if (endpoint === '/quizzes/useranswer' && (userRole === 'superadmin' || userRole === 'user')) {
        return true;
    } else if (endpoint === '/quizzes/dashboard' && (userRole === 'superadmin' || userRole === 'admin' || userRole === 'user')) {
        return true;
    } else if (endpoint === '/profile' && (userRole === 'superadmin' || userRole === 'admin' || userRole === 'user')) {
        return true;
    } else {
        return false;
    }
};

export default roleAccess;
