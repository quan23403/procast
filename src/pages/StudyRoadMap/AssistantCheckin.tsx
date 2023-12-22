import { useMutation } from "@tanstack/react-query";
import { Checkbox } from "antd";
import dayjs from "dayjs";
import { useContext } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import employeeApi, { checkinData } from "~/apis/employee.api";
import { AppConxtext } from "~/contexts/app.context";
import { classesList } from "~/types/classLists.type";

export default function AssistantCheckin(props: { record: classesList, checkin: checkinData[] }) {
    const { id } = useParams()

    const record = {
        class_id: props.record.class_id,
        ta: props.record.ta,
        date: dayjs(`${props.record.date} ${props.record.start_time}`, 'DD/MM/YYYY HH:mm'),
        checkin: props.checkin.filter((ses)=> ses.classId == props.record.class_id.toString()),
        course_type: props.record.type_class
    }

    const { profile } = useContext(AppConxtext)

    const [isCheckin, setIsCheckin] = useState<boolean>(!!record.checkin.find((user)=> user.userId===profile?.user_id.toString()));

    const updateCheckin = () => {
        // Use the mutation function to update check-in status
        checkin.mutate(undefined, {
            onSuccess: () => {
                setIsCheckin(true)
            },
            onError: () => {
                setIsCheckin(false)
            }
        });
    };


    const checkin = useMutation({
        mutationKey: ['updateCheckin', record.class_id], // Specify the mutation key here
        mutationFn: () => {
            return employeeApi.updateCheckin({
                course_id: id || "",
                class_id: record.class_id,
                course_type_id: record.course_type
            });
        },
    });


    return (
        <>
            {record.ta?.map((item: { label: string, value: string }) => {
                const user = record.checkin.find((user)=>(user.userId===item.value))
                return(
                <div key={item.value}>
                    <span>{item.label}</span>
                    { user ? (
                        <small>
                            <br />Checked in: {user.checkInTime}
                        </small>
                    ) : (
                        // Check if it's today before showing the checkbox
                        dayjs(record.date).diff(dayjs(), 'minute') >= -30 
                        && dayjs(record.date).diff(dayjs(), 'minute') <= 30
                        && item.value===profile?.user_id.toString()
                        && !isCheckin 
                        && (
                            <Checkbox
                                value={item.value}
                                onChange={() => updateCheckin()}
                                disabled={isCheckin}
                                checked={isCheckin}
                            >
                                Check-in
                            </Checkbox>
                        )
                    )}
                </div>
            )})}
        </>
    );
}
