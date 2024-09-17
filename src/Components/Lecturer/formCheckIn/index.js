import React, { useState } from 'react';
import Button from '../../Button';
import { updateEvent } from '../../../services/Admin/eventService';
import InputCheckBox from '../../checkBox';

function FormCheckIn({ setShow, event, hostList, memberList, cssTable }) {
    // Initialize attendance state with boolean 'checked' values
    const [attendance, setAttendance] = useState(
        memberList.map((member) => ({
            lecturerId: member.lecturerId,
            lecturerName: member.lecturerName,
            checked: member.checked === 'true', // Ensure initial value is boolean
        })),
    );

    // Handle checkbox change, toggle 'checked' value based on current state
    const handleChance = (e, lecturerId) => {
        const { checked } = e.target; // This will be boolean true/false

        setAttendance((prevState) =>
            prevState.map((member) =>
                member.lecturerId === lecturerId
                    ? { ...member, checked: checked } // Update checked status
                    : member,
            ),
        );
    };
    console.log();

    // Save attendance data to server
    const handleSave = async () => {
        try {
            await updateEvent(event.eventId, { attendance });
            alert('Attendance updated successfully!');
        } catch (error) {
            console.error('Error updating attendance:', error);
        }
    };
    console.log(attendance);

    return (
        <div className={cssTable ? cssTable : 'container'}>
            <Button size="S" rouded onClick={() => setShow(false)}>
                Quay lại
            </Button>
            <h1>Bảng Điểm Danh</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tên</th>
                        <th>Điểm Danh</th>
                    </tr>
                </thead>
                <tbody>
                    {attendance.map((member) => (
                        <tr key={member.lecturerId}>
                            <td>{member.lecturerId}</td>
                            <td>{member.lecturerName}</td>
                            <td>
                                <InputCheckBox
                                    name="check"
                                    type="checkbox"
                                    checked={member.checked}
                                    handleChange={(e) =>
                                        handleChance(e, member.lecturerId)
                                    }
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Button size="S" rouded onClick={handleSave}>
                Lưu điểm danh
            </Button>
        </div>
    );
}

export default FormCheckIn;
