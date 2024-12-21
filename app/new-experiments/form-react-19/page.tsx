// async function saveAction() {
// 	"use server";
// 	console.log("Hey");
// }

// export default function page() {
// 	return (
// 		<form action={saveAction}>
// 			<input
// 				name="address"
// 				type="text"
// 				placeholder="Address"
// 				className="border border-gray-400 m-64 rounded text-xl pl-2"
// 			/>
// 		</form>
// 	);
// }

import AddressForm from "./components/address-form";

export default function Page() {
	return <AddressForm />;
}
