import { dirname } from "pathe";
import { withTrailingSlash } from "ufo";

const useModalNavigation = () => {
  const router = useRouter();
  return (modalPath: string, isInsideModal: boolean) => {
    if (isInsideModal) {
      return `${withTrailingSlash(
        dirname(router.currentRoute.value.path)
      )}${modalPath}`;
    }
    return `${withTrailingSlash(router.currentRoute.value.path)}${modalPath}`;
  };
};

export default useModalNavigation;
