import { useToast } from "@chakra-ui/react";

export default function CustomToast() {
	// const { toast } = UseAuth();
	const toast = useToast();

	const successToast = (title: string, description: string) => {
		toast({
			title: title || "Success.",
			description: description || "",
			status: "success",
			duration: 2000,
			isClosable: true,
		});
	};
	const errorToast = (title: string, description: String) => {
		toast({
			title: title || "Something went wrong, Try again.",
			description: description || "",
			status: "error",
			duration: 2000,
			isClosable: true,
		});
	};

	return { successToast, errorToast };
}
