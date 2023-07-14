import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { customFetch } from './axios';
import { toast } from 'react-toastify';

// custom hook for fetching data from backend API
export const useFetch = () => {
    const { data, isError, isLoading, error } = useQuery({
        queryKey: ['tasks'],
        queryFn: async () => {
            const { data } = await customFetch.get('/');
            const { taskLists } = data;

            return taskLists;
        }
    });

    return {
        data,
        isError,
        isLoading,
        error
    };
};

// custom hook for creating items on grocery user interface
export const useCreateTask = () => {
    const queryClient = useQueryClient();
    const { mutate: createTask, isLoading: isCreating } = useMutation({
        mutationFn: (newItem) => customFetch.post('/', { title: newItem }),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['tasks']
            });

            toast.success('Task added successfully');
        },
        onError: (error) => {
            toast.error(error.response.data.msg);
        }
    });

    return {
        createTask,
        isCreating
    };
};

// custom hook for updating task on grocery frontend
export const useUpdateTask = (id) => {
    const queryClient = useQueryClient();
    const { mutate: updateTask, isLoading: isUpdating } = useMutation({
        mutationFn: (newTask) => customFetch.patch(`/${id}`, newTask),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['tasks']
            });

            toast.success('Task updated successfully');
        },
        onError: (error) => {
            toast.error(error.response.data.msg);
        }
    });

    return {
        updateTask,
        isUpdating
    }
};

// custom hook for deleting a single task with a specified id
export const useDeleteTask = (id) => {
    const queryClient = useQueryClient();

    const { mutate: deleteTask, isDeleting } = useMutation({
        mutationFn: () => customFetch.delete(`/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['tasks']
            });

            toast.success('Item deleted successfully');
        },
        onError: (error) => {
            toast.error(error.response.data.msg);
        }
    });

    return {
        deleteTask,
        isDeleting
    }
}