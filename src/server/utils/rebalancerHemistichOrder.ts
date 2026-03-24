import HemistichModel from "@/server/models/hemistich";

export async function rebalanceHemistichOrders(poemId: string) {

    const items = await HemistichModel
        .find({ poem: poemId })
        .sort({ order: 1 })
        .select({ _id: 1 })
        .lean();

    const bulkOps = items.map((item, index) => ({
        updateOne: {
            filter: { _id: item._id },
            update: { order: (index + 1) * 1000 }
        }
    }));

    await HemistichModel.bulkWrite(bulkOps);
}
