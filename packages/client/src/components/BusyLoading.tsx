import { Modal } from "components";
import { selectSystemLoading, useAppSelector } from "system";

export function BusyLoading() {
	const isLoading = useAppSelector(selectSystemLoading);
  return(
		<>
			{isLoading && (
        <Modal className="z-10 flex justify-center items-center">
					<p className="text-white">Loading......</p>
        </Modal>
      )}
		</>
	);
}