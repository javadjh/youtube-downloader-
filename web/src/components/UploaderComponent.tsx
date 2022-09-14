import { Button, message, Upload, UploadProps } from "antd"

interface IUploaderComponent {
    children:any;
    onUploaded:(isFinish:boolean)=>void
}
const UploaderComponent :React.FC<IUploaderComponent> = ({children,onUploaded})=>{
    const props: UploadProps = {
        name: 'file',
        showUploadList:false,
        action: 'http://localhost:4400/api/v1/insert/group',
        headers: {
        token: `${localStorage.getItem("token")}`,
        },
        onChange(info) {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
            onUploaded(true)
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
        },
    };
    return (
        <Upload {...props}>
            {children}
        </Upload>
    )
}
export default UploaderComponent