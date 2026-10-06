import React, {Component} from "react";

class ContainerDetail extends Component{
    render(){
        // 이 컴포넌트가 화면에 뭘 보여줄지 정하는 메서드 
        const {slot,order,onBack} = this.props;
        // props : 부모인 App 이 상세 컴포넌트에 전달한 데이터와 함수 
        // 배정 데이터는 App의 state 에 두고, 상세 화면은 받아서 표시 

        return(
            <main>
                <h1>컨테이너 상세</h1>

                <p>공간 번호 : {slot.id}</p>
                <p>오더 번호 : {order.id}</p>
                <p>상품명 : {order.product}</p>
                <p>수량 : {order.quantity}개</p>

                <button onClick={onBack}>
                    야드로 돌아가기 
                    {/*onBack은 App이 상세 컴포넌트에 전달한 함수 
                       상세 화면에서 버튼을 누르면 App의 currentPage.가 다시 "yard"로 바뀜 
                    */}
                </button>
            </main>
        )
    }
}

export default ContainerDetail;