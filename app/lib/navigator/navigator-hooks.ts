import {
    useNavigate,
    useLocation as useRouterLocation,
    useParams as useRouterParams,
    useSearchParams as useRouterSearchParams,
} from '@remix-run/react';

export const useRouter = useNavigate;

export const useLocation = useRouterLocation;

export const useParams = useRouterParams;

export const useSearchParams = useRouterSearchParams;
