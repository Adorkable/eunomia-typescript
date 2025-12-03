export type Vector2d = {
    x: number
    y: number
}

export const addVector2ds = (left: Vector2d, right: Vector2d): Vector2d => {
    return {
        x: left.x + right.x,
        y: left.y + right.y,
    }
}

export type BoundingRectangle2d = {
    topLeft: Vector2d
    bottomRight: Vector2d
}

export const createBoundingRectangle2dWithSize = (topLeft: Vector2d, width: number, height: number): BoundingRectangle2d => {
    return createBoundingRectangle2dWithSizeVector2D(topLeft, { x: width, y: height })
}

export const createBoundingRectangle2dWithSizeVector2D = (topLeft: Vector2d, size: Vector2d): BoundingRectangle2d => {
    return {
        topLeft,
        bottomRight: addVector2ds(topLeft, size),
    }
}