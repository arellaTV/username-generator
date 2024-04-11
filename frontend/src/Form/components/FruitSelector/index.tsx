import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import fruits from "./fruits.json";
import { useState } from "react";

interface Props {
  value: string;
  onChange: (fruit: string) => void;
}

export function FruitSelector({ value, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const [selectedValue, setValue] = useState(value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {selectedValue
            ? fruits.find((fruit) => fruit === selectedValue)
            : "Select fruit..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search fruit..." />
          <CommandEmpty>No fruit found.</CommandEmpty>
          <CommandGroup>
            <CommandList>
              {fruits?.map((fruit) => (
                <CommandItem
                  key={fruit}
                  value={fruit}
                  onSelect={(currentValue) => {
                    onChange(
                      currentValue === selectedValue ? "" : currentValue
                    );
                    setValue(
                      currentValue === selectedValue ? "" : currentValue
                    );
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedValue === fruit ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {fruit}
                </CommandItem>
              ))}
            </CommandList>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
