import { Plus } from "lucide-react";
import { Minus } from "lucide-react";
import { Play } from "lucide-react";
import { CircleStop } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ButtonIconPlus() {
  return (
    <Button variant="outline" size="icon">
      <Plus />
    </Button>
  )
}

export function ButtonIconMinus() {
  return (
    <Button variant="outline" size="icon">
      <Minus />
    </Button>
  )
}


export function ButtonIconPlay() {
  return (
    <Button variant="outline" size="icon">
      <Play />
    </Button>
  )
}

export function ButtonIconStop() {
  return (
    <Button variant="outline" size="icon">
      <CircleStop />
    </Button>
  )
}
