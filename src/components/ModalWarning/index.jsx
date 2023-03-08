import { Modal, Typography, Button} from 'antd';
const { Title } = Typography;


export const ModalWarning = ({open, onCancelModal, mess}) => {
    return (
        <Modal open={open} onCancel={onCancelModal} title={"Предупреждение: "}
            footer ={[
                <Button key="back" onClick={onCancelModal}>
                ОК
                </Button>
            ]}
            >
                <Title level={5} style={{textAlign: 'center'}}>{mess}</Title>
            
        </Modal>
    )
}


