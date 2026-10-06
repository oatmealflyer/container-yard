import React, {Component} from "react";

class AssignmentList extends Component{
    render(){
        const {slots,onBack} = this.props;
        // App의 데이터를 props 로 받아 표시, 야드에서 새로 배정한 결과를 같은 목록에서 확인할 수 있음 

        const assignedSlots = slots.filter(
            (slot) => slot.orderId
            // orderId가 있는 공간만 남김 .null은 제외 
        );

        return(
            <main>
                <h1>배정 현황</h1>

                <ul>
                    {assignedSlots.map((slot)=>(
                        <li key={slot.id}>
                            {slot.id} / {slot.orderId}
                        </li>
                    ))}
                </ul>

                <button onClick={onBack}>
                    야드로 돌아가기 
                </button>
            </main>
        )
    }

    
}
export default AssignmentList;