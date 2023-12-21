import { useMutation, useQuery } from "@tanstack/react-query";
import { Checkbox } from "antd";
import dayjs from "dayjs";
import { isUndefined, omitBy } from "lodash";
import React from "react";
import { useState } from "react";
import employeeApi from "~/apis/employee.api";
import { classesList } from "~/types/classLists.type";

export default function AssistantCheckin(props: { record: classesList }) {
    const record = {
        class_id: props.record.class_id,
        ta: props.record.ta,
        date: dayjs(props.record.date, 'DD/MM/YYYY')
    }

    const [isCheckin, setIsCheckin] = useState<Record<number, boolean>>({});

    const queryConfig = omitBy({
        class_id: record.class_id,
    }, isUndefined);

    const { data: checkinData } = useQuery({
        queryKey: ["checkinData", queryConfig],
        queryFn: () => {
            return employeeApi.getCheckin(queryConfig);
        },
    });

    // Set checked-in status based on fetched data
    React.useEffect(() => {
        const checkinStatus = {};
        checkinData?.data.data.forEach((item: { user_id: string | number; }) => {
            checkinStatus[item.user_id] = true;
        });
        setIsCheckin(checkinStatus);
    }, [checkinData]);

    const updateCheckin = (user_id: number) => {
        // Use the mutation function to update check-in status
        checkin.mutate({ class_id: record.class_id, user_id: user_id });
    };

    const checkin = useMutation({
        mutationKey: ["updateCheckin"],
        mutationFn: (data) => {
            return employeeApi.updateCheckin(data);
        },
    });

    return (
        <>
            {record.ta?.map((item: {label: string, value: number}) => (
                <div key={item.value}>
                    <span>{item.label}</span>
                    {isCheckin[item.value] ? (
                        <small>
                            <br />Checked in: {checkinData?.data.data.time}
                        </small>
                    ) : (
                        // Check if it's today before showing the checkbox
                        dayjs(record.date).isSame(dayjs(), "day") && (
                            <Checkbox
                                value={item.value}
                                onChange={() => updateCheckin(item.value)}
                            >
                                Check-in
                            </Checkbox>
                        )
                    )}
                </div>
            ))}
        </>
    );
}
