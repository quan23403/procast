/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Checkbox } from "antd";
import dayjs from "dayjs";
import { useContext } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import employeeApi, { checkinData } from "~/apis/employee.api";
import { AppConxtext } from "~/contexts/app.context";
import { classesList } from "~/types/classLists.type";

export default function AssistantCheckin(props: { record: classesList, checkin: checkinData[] }) {
    const queryClient = useQueryClient();
    const { id } = useParams()
    const [assistant, setAssistant] = useState<string>("");
    const record = {
        class_id: props.record.class_id,
        ta: props.record.ta,
        date: dayjs(`${props.record.date} ${props.record.start_time}`, 'DD/MM/YYYY HH:mm'),
        checkin: props.checkin.filter((ses) => ses.classId == props.record.class_id.toString()),
        course_type: props.record.type_class
    }

    const { profile } = useContext(AppConxtext)

    const [isCheckin, setIsCheckin] = useState<Record<string, boolean>>({});

    const setChecked = (ta_id: string) => {
        setIsCheckin({ ...isCheckin, [ta_id]: true });
    }

    const setUnChecked = (ta_id: string) => {
        setIsCheckin({ ...isCheckin, [ta_id]: false });
    }
    const updateCheckin = (ta_id: string) => {
        setAssistant(ta_id);
        // Use the mutation function to update check-in status
        checkin.mutate(undefined, {
            onSuccess: () => {
                queryClient.invalidateQueries(['checkinData', { courseId: id }]);
                setChecked(ta_id);
                toast.success("Check-in thành công");
            },
            onError: (error: any) => {
                setUnChecked(ta_id);
                toast.error(error.response.data.message);
            }
        });
    };


    const checkin = useMutation({
        mutationKey: ['updateCheckin', record.class_id], // Specify the mutation key here
        mutationFn: () => {
            return employeeApi.updateCheckin({
                course_id: id || "",
                class_id: record.class_id,
                course_type_id: record.course_type,
                user_id: assistant,
            });
        },
    });


    return (
        <>
            {record.ta?.map((item: { label: string, value: string }) => {
                const user = record.checkin.find((user) => (user.userId === item.value && dayjs(user.checkInTime).add(7, 'hour').format('DD/MM/YYYY') === dayjs(record.date).format('DD/MM/YYYY')))
                const checkinTime = user?.checkInTime ? dayjs(user.checkInTime).add(7, 'hour').format('DD/MM/YYYY HH:mm:ss') : ""
                return (
                    <div key={item.value}>
                        <span style={{ marginRight: "8px" }}>{item.label}</span>
                        {user ? (
                            <small>
                                <br />Checked in: {checkinTime}
                            </small>
                        ) : (
                            // Check if it's today before showing the checkbox
                            dayjs(record.date).diff(dayjs(), 'minute') >= -30
                            && dayjs(record.date).diff(dayjs(), 'minute') <= 30
                            && profile?.role === "admin"
                            && (
                                <Checkbox
                                    value={item.value}
                                    onChange={() => updateCheckin(item.value)}
                                    disabled={isCheckin[item.value]}
                                    checked={isCheckin[item.value]}
                                >
                                    Check-in
                                </Checkbox>
                            )
                        )}
                    </div>
                )
            })}
        </>
    );
}
