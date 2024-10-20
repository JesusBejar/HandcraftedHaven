
export async function userLogout(req: { logOut: () => void; }, res: { clearCookie: (arg0: string) => void; redirect: (arg0: string) => any; }){
    res.clearCookie("token");
    req.logOut();
    console.log('Success! User logged out.');
    return res.redirect('/')
}