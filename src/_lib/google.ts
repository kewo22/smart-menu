import { Auth, google, sheets_v4 } from "googleapis";

export const glAuth = async () => {
    const glAuth = await google.auth.getClient({
        projectId: "smart-menu-412806",
        credentials: {
            "type": "service_account",
            "project_id": "smart-menu-412806",
            "private_key_id": "01c4e59a6dc7ab8269d7b981421575e2501cff17",
            "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDHVFgfp9ye2kYz\nBcRBI1f3yTOrBYO7vVV6WN56p+00rbFRDvU1EcA5RmEtB53tINBne6Ja7vId2jAo\njxSePVKxXmUn+ALjT2uDunAmTvFHtrZt9zmTy8Kc3Y+B8zK149pRv0wd5eg95w4r\nAQCZj2NEguTkL6PBkDbhO9Sg0rjLtKqg/GzEixp5IVM8RlCf3mqJAatZK6flQ0RX\nqAtrZdB8NzosHwdvsATvI0gMVbTJmr7sC8m4nidGhdhYg7INV7bLQOwvr54sW6BR\nO8f4RGFDQnKqRap4PdlEwyMYHzRrctrLB3R1j8TCl7UViGlRCM8Mq5uzzqkEu1i6\np4bGv1y/AgMBAAECggEAAaMoD30sgG2LPWi4Yk9CWLm2tUVCqMHMYvM57fNVLSVE\nG0YD2PTACc28h0cpvUSTZwDf+4k87zvXQMNeyFH5TOsD6l53f5srvJWaeDtrxfVd\nQu1QnsMst7x7gktsyOEJ7mP44cH9X2IiKVOacqh33fHepB/euNH7cWwxZJohLyMq\nt9VTl3tctnHK+PvtUuicblYnlqQ//cNN8MzkNeuJz6QzMIVihUjXfXdO1hdbB15y\neqfy+DiqFCUeXomQC3KZxvx6Jlm46dFtcnR1s1kdIHd0VFSia2GuGlqheCoSk3C+\nJkDP5Ikt4VCark00q9WESSwR5PFUbSxIqVtFuizvOQKBgQD4xfk9Fk/4DonUH6xp\nNpXUgKEIv4J9WMv6mHextr3nKLaqehqMFHS3brAuDtIDc61siOP7LylclrwZ15uj\nKEcM6Fppl4RiDcDIJrgtl9+i8ENXL8kx9LiEL90gOR3lRUmBwK3DWYXhQWfpmMWe\nQmz855t55vZA8UepT5KJqatVPQKBgQDNHq06ZGKrn3Qbq8l4XwLWQXskhSF+jhGp\nwaV8qxse0YP4cn9PclxhfJUyXsAwHomwVkVPU+TgfmV6MGnr27kOlKHPFIEutLbG\nd+nFREQuRqxNMhAB8A43bF3F8NFnKGM9770CvLzPxcBckof/WQVVitF8x/u89XjW\nG7KrlTvxqwKBgFcWBsAJtYjingEx7UsPnre7J6RGVknG8fERuqTtkeD/8aIQCIcN\nCibEisw0x/QJZKZf7V8bDWGqKsLpJUSibuzn0e6w6djhc6EdXNApIFKLxScaRVZF\nkupDTydel0aRUMApUSrXhfRqzxOJNXTHUBvggB7WaVImpK1ye5vRV3cJAoGBAJ/3\nOpV9UE4T7pLd6CNNxYKeUpDqmnJ+DVxcPtj5AA+KyebqNEsbHtyQMjK0HiHozuyM\ne0UgYjCJok4mj5R3KN0sIPzEOvLX0Gr7fX5wfNOyHhGd50n7krq6cm86HbTblHnr\nC3alBoLq79fCFvmWzUgnGLS9qZ91uKURuMeDfNo9AoGAKpwK1F8OwOtsRtU3N8jo\nlmar/cVeTUz1aSp5eqIEx/VUiaHYWXHEJ0HlInJGm7EIw+MwYOLq+pfe5nNZIhzn\n1d+NUAYbl6LNvkB1veLiVtNSKyWuyxyQPolv7N4SY+oU0LDoepJM666dLY+4vaUA\nY1fLup3YTiOeAoqxU8cnXuM=\n-----END PRIVATE KEY-----\n",
            "client_email": "sm-serviec-acc@smart-menu-412806.iam.gserviceaccount.com",
            // "client_id": "112224351016929479010",
            // "auth_uri": "https://accounts.google.com/o/oauth2/auth",
            // "token_uri": "https://oauth2.googleapis.com/token",
            // "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
            // "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/sm-serviec-acc%40smart-menu-412806.iam.gserviceaccount.com",
            "universe_domain": "googleapis.com"
        },
        scopes: ["https://www.googleapis.com/auth/spreadsheets", "https://www.googleapis.com/auth/drive", "https://www.googleapis.com/auth/drive.file"],
    });
    return glAuth;
}

export const createSheet = async (sheets: sheets_v4.Sheets, title: string) => {
    const res = await sheets.spreadsheets.create({
        requestBody: {
            properties: {
                title
            },
            // dataSources: [
            //     {
            //         sheetId: "Sheet1"
            //     }
            // ]
        },
    })

    return res;
}