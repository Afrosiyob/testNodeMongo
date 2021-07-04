const setPermission = ( permissions ) =>
    async ( req, res, next ) => {
        const { userId } = req.user;
        const { role } = await UserModel.findById( userId );
        if ( permissions.includes( role ) ) {
            next();
        } else {
            return res.status( 401 ).json( { message: "u dont have permission this route" } );
        }
    };

const checkAuth = async ( req, res, next ) => {
    if ( req.method === "OPTIONS" ) {
        await next();
    } else {
        try {
            let token;
            if (
                req.headers.authorization &&
                req.headers.authorization.startsWith( "Bearer" )
            ) {
                token = req.headers.authorization.split( " " )[ 1 ]; // "Bearer TOKEN"
            }
            if ( !token ) {
                await res.status( 401 ).json( { message: "auth error" } );
            } else {
                let decoded = jwt.verify( token, config.get( "jwtSecret" ) );
                req.user = decoded;
                res.setHeader( "Last-Modified", new Date().toUTCString() );
                await next();
            }
        } catch ( error ) {
            console.log( error );
            return await res.status( 401 ).json( { message: "auth error" } );
        }
    }
};