import axios from "axios";
import { Table } from "flowbite-react";
import { ToastContainer, toast } from 'react-toastify';
import Swal from 'sweetalert2/dist/sweetalert2.js'



export default function EnquiryList({ data, getAllEnquiry, Swal,setformData }) {


    let updateEn = (upId) => {
        axios.get(`http://localhost:8001/api/enquiry//single/${upId}`)
            .then((res) => {
                let data = res.data
                setformData(data.enquriy)
            })
    }

    let deleteEn = (delId) => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axios.delete(`http://localhost:8001/api/enquiry/delete/${delId}`).then((res) => {
                    toast.success('Enquiry deleted successfully..')
                    getAllEnquiry();
                })
            }
        });
    }


    return (

        <div className='bg-gray-200 rounded-2xl px-5 overflow-y-auto max-h-[480px] '>
            <ToastContainer />
            <h1 className='font-bold text-[20px] py-2 text-center'>Enquiry List</h1>
            <div className="overflow-x-auto max-h-[345px] rounded-xl">
                <Table>
                    <Table.Head>
                        <Table.HeadCell>Sr No</Table.HeadCell>
                        <Table.HeadCell>Name</Table.HeadCell>
                        <Table.HeadCell>Email</Table.HeadCell>
                        <Table.HeadCell>Phone No</Table.HeadCell>
                        <Table.HeadCell>Message</Table.HeadCell>
                        <Table.HeadCell>
                            Delete
                        </Table.HeadCell>
                        <Table.HeadCell>
                            Edit
                        </Table.HeadCell>
                    </Table.Head>

                    <Table.Body className="divide-y  ">
                        {
                            data.length >= 1 ?
                                data.map((item, index) => {
                                    return (
                                        <tr className="bg-white" >
                                            <Table.Cell>{index + 1}</Table.Cell>
                                            <Table.Cell>{item.name}</Table.Cell>
                                            <Table.Cell>{item.email}</Table.Cell>
                                            <Table.Cell>{item.phone}</Table.Cell>
                                            <Table.Cell>{item.message}</Table.Cell>
                                            <Table.Cell>
                                                <button onClick={() => deleteEn(item._id)} className="bg-red-500 text-white px-4 py-1 rounded-md">Delete</button>
                                            </Table.Cell>
                                            <Table.Cell>
                                                <button onClick={(() => { updateEn(item._id) })} className="bg-blue-500 text-white px-4 py-1 rounded-md">Update</button>
                                            </Table.Cell>
                                        </tr>
                                    )
                                })
                                :
                                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <Table.Cell colSpan={7} className="text-center">
                                        Data No found
                                    </Table.Cell>
                                </Table.Row>
                        }


                    </Table.Body>
                </Table>
            </div>
        </div>
    )
}