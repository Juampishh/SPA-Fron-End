
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from 'keep-react'

export const CardComponent = () => {
  return (
    <Card>
      <CardHeader>
        <img src="https://www.membergate.com/members/images/3559b.png" alt="" />
      </CardHeader>
      <CardContent className="space-y-3">
        <CardTitle>Lorem ipsum dolor sit</CardTitle>
        <CardDescription>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi ipsam animi voluptas perspiciatis quidem esse!
        </CardDescription>
        <Button size="sm" color="secondary">
          Buy Now
        </Button>
      </CardContent>
    </Card>
  )
}

