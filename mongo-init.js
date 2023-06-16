db.createUser(
    {
        user: 'user',
        pwd: 'Hell0_W0rld',
        roles: [
            {
                role: 'readWrite',
                db: 'orderResource'
            }
        ]
    }
)