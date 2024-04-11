import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FruitSelector } from "./components/FruitSelector";
import { DatePicker } from "./components/DatePicker";

export function Form() {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Username Generator</CardTitle>
        <CardDescription>
          Enter the details below to generate a unique username.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" placeholder="Enter your first name" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" placeholder="Enter your last name" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="lastName">Date of Birth</Label>
              <DatePicker />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Fruit</Label>
              <FruitSelector />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button>Generate</Button>
      </CardFooter>
    </Card>
  );
}
