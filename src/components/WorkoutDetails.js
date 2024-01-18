import { useState, useEffect } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import toast from "react-hot-toast";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAuthContext } from "../hooks/useAuthContext";

// date-fns
import { formatDistanceToNow, format } from "date-fns";

function WorkoutDetails({ workouts }) {
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  const notify = (deletedWorkout) =>
    toast.success(`${deletedWorkout.title} workout Deleted`);

  const handleDelete = async (id) => {
    if (!user) {
      return;
    }

    const response = await fetch(
      `https://workoutsbuddy-server.onrender.com/api/workouts/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: json.deletedWorkout });
      notify(json.deletedWorkout);
    }
  };

  return (
    <>
      {workouts &&
        workouts.map((workout) => {
          return (
            <div key={workout._id} className="workout-details">
              <h4>{workout.title}</h4>
              <p>
                <strong>Load (kg): </strong>
                {workout.load}
              </p>
              <p>
                <strong>Reps: </strong>
                {workout.reps}
              </p>
              <p>
                {format(
                  new Date(workout.createdAt),
                  "MMMM do yyyy, h:mm:ss a",
                  {
                    addSuffix: true,
                  }
                )}
                <i className="time-to-now">
                  (
                  {formatDistanceToNow(new Date(workout.createdAt), {
                    addSuffix: true,
                  })}
                  )
                </i>
              </p>

              <span onClick={() => handleDelete(workout._id)}>
                <DeleteIcon />
              </span>
            </div>
          );
        })}
    </>
  );
}

export default WorkoutDetails;
