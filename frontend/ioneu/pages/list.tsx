import Down from "../components/index/downNavigation"
import Up from "../components/index/upNavigation"
import List from "../components/list/list"


export default function list () {
    return (
        <div>    
            <Up />
            <Down />        
            {/* <List /> */}
            <List />
            {/* 기업명, 채용정보, 지원자격, 근무조건, 접수/마감일 등 */}
        </div>
    )
}
