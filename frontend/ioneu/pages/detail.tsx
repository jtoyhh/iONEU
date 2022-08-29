import Down from "../components/index/downNavigation copy"
import Up from "../components/index/upNavigation"
import Detail from "../components/detail/index"
import { Container, Typography} from "@mui/material";
export default function detail () {
    return (
        <div>
            <Container>
                <Up />
                <Down />        
                <Detail />
            </Container>
        </div>
    )
}
