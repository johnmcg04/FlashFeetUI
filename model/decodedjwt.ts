import { JwtPayload } from "jwt-decode";

export interface DecodedJwt extends JwtPayload {
    role_id: number;
}