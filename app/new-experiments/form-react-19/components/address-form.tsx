"use client";

import { CheckCircle2 } from "lucide-react";
import { useActionState } from "react";
import { Alert, AlertDescription } from "@/components/components/ui/alert";
import { Button } from "@/components/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/components/ui/card";
import { Input } from "@/components/components/ui/input";
import { Label } from "@/components/components/ui/label";
import { submitAddress } from "../actions/address";
import type { ActionResponse } from "../types/address";

const initialState: ActionResponse = {
	success: false,
	message: "",
};

export default function AddressForm() {
	const [state, action, isPending] = useActionState(
		submitAddress,
		initialState,
	);

	return (
		<Card className="w-full max-w-lg mx-auto">
			<CardHeader>
				<CardTitle>Address Information</CardTitle>
				<CardDescription>
					Please enter your shipping address details below.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form action={action} className="space-y-6" autoComplete="on">
					<div className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="streetAddress">Street Address</Label>
							<Input
								id="streetAddress"
								name="streetAddress"
								placeholder="123 Main St"
								// client-side validation is turnoff on purpose to trigger server-side validation
								// required
								// minLength={5}
								// maxLength={100}
								autoComplete="street-address"
								aria-describedby="streetAddress-error"
								className={state?.errors?.streetAddress ? "border-red-500" : ""}
							/>
							{state?.errors?.streetAddress && (
								<p id="streetAddress-error" className="text-sm text-red-500">
									{state.errors.streetAddress[0]}
								</p>
							)}
						</div>

						<div className="space-y-2">
							<Label htmlFor="apartment">Apartment/Suite (Optional)</Label>
							<Input
								id="apartment"
								name="apartment"
								placeholder="Apt 4B"
								maxLength={20}
								autoComplete="address-line2"
								aria-describedby="apartment-error"
							/>
						</div>

						<div className="grid grid-cols-2 gap-4">
							<div className="space-y-2">
								<Label htmlFor="city">City</Label>
								<Input
									defaultValue={state?.inputs?.city}
									id="city"
									name="city"
									placeholder="New York"
									required
									minLength={2}
									maxLength={50}
									autoComplete="address-level2"
									aria-describedby="city-error"
									className={state?.errors?.city ? "border-red-500" : ""}
								/>
								{state?.errors?.city && (
									<p id="city-error" className="text-sm text-red-500">
										{state.errors.city[0]}
									</p>
								)}
							</div>

							<div className="space-y-2">
								<Label htmlFor="state">State</Label>
								<Input
									defaultValue={state?.inputs?.state}
									id="state"
									name="state"
									placeholder="NY"
									required
									minLength={2}
									maxLength={50}
									autoComplete="address-level1"
									aria-describedby="state-error"
									className={state?.errors?.state ? "border-red-500" : ""}
								/>
								{state?.errors?.state && (
									<p id="state-error" className="text-sm text-red-500">
										{state.errors.state[0]}
									</p>
								)}
							</div>
						</div>

						<div className="grid grid-cols-2 gap-4">
							<div className="space-y-2">
								<Label htmlFor="zipCode">ZIP Code</Label>
								<Input
									defaultValue={state?.inputs?.zipCode}
									id="zipCode"
									name="zipCode"
									placeholder="10001"
									required
									pattern="[0-9]{5}(-[0-9]{4})?"
									maxLength={10}
									autoComplete="postal-code"
									aria-describedby="zipCode-error"
									className={state?.errors?.zipCode ? "border-red-500" : ""}
								/>
								{state?.errors?.zipCode && (
									<p id="zipCode-error" className="text-sm text-red-500">
										{state.errors.zipCode[0]}
									</p>
								)}
							</div>

							<div className="space-y-2">
								<Label htmlFor="country">Country</Label>
								<Input
									defaultValue={state?.inputs?.country}
									id="country"
									name="country"
									placeholder="United States"
									required
									minLength={2}
									maxLength={56}
									autoComplete="country-name"
									aria-describedby="country-error"
									className={state?.errors?.country ? "border-red-500" : ""}
								/>
								{state?.errors?.country && (
									<p id="country-error" className="text-sm text-red-500">
										{state.errors.country[0]}
									</p>
								)}
							</div>
						</div>
					</div>

					{state?.message && (
						<Alert variant={state.success ? "default" : "destructive"}>
							{state.success && <CheckCircle2 className="h-4 w-4" />}
							<AlertDescription>{state.message}</AlertDescription>
						</Alert>
					)}

					<Button type="submit" className="w-full" disabled={isPending}>
						{isPending ? "Saving..." : "Save Address"}
					</Button>
				</form>
			</CardContent>
		</Card>
	);
}
