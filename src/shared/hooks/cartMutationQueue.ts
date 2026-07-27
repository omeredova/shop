let cartMutationQueue: Promise<void> = Promise.resolve();

export const enqueueCartMutation = <T>(
    mutation: () => Promise<T>
): Promise<T> => {
    const result = cartMutationQueue.then(mutation, mutation);

    cartMutationQueue = result.then(
        () => undefined,
        () => undefined
    );

    return result;
};