import { TravelProduct } from '@/types/models'

interface GroupProductInfoProps {
  product: TravelProduct
}

export default function GroupProductInfo({ product }: GroupProductInfoProps) {
  return (
    <div className="space-y-8">
      {/* 产品图片展示 */}
      <div>
        <h3 className="text-xl font-semibold mb-4">产品图片</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {product.images.map((image, index) => (
            <div key={index} className="aspect-square rounded-lg overflow-hidden">
              <img
                src={image}
                alt={`${product.title} - 图片${index + 1}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </div>

      {/* 产品详情 */}
      <div>
        <h3 className="text-xl font-semibold mb-4">产品详情</h3>
        <div className="bg-gray-50 rounded-lg p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="font-medium text-gray-700">产品名称：</span>
              <span className="text-gray-900">{product.title}</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">目的地：</span>
              <span className="text-gray-900">{product.destination}</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">行程天数：</span>
              <span className="text-gray-900">{product.duration}天</span>
            </div>
            {product.transportation && (
              <div>
                <span className="font-medium text-gray-700">交通方式：</span>
                <span className="text-gray-900">{product.transportation}</span>
              </div>
            )}
            {product.accommodation && (
              <div>
                <span className="font-medium text-gray-700">住宿标准：</span>
                <span className="text-gray-900">{product.accommodation}</span>
              </div>
            )}
          </div>
          
          {product.tags && product.tags.length > 0 && (
            <div>
              <span className="font-medium text-gray-700">产品标签：</span>
              <div className="flex flex-wrap gap-2 mt-2">
                {product.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 行程安排 */}
      <div>
        <h3 className="text-xl font-semibold mb-4">行程安排</h3>
        <div className="space-y-4">
          {product.itinerary ? (
            <div className="text-gray-700 whitespace-pre-line">{product.itinerary}</div>
          ) : (
            <div className="text-gray-500 italic">暂无详细行程安排</div>
          )}
        </div>
      </div>

      {/* 费用说明 */}
      <div>
        <h3 className="text-xl font-semibold mb-4">费用说明</h3>
        <div className="bg-gray-50 rounded-lg p-6 space-y-4">
          <div>
            <h4 className="font-medium text-gray-800 mb-2">费用包含：</h4>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>往返交通费用</li>
              <li>行程中所列酒店住宿</li>
              <li>行程中所列用餐</li>
              <li>景点门票费用</li>
              <li>专业导游服务</li>
              <li>旅游意外保险</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-800 mb-2">费用不含：</h4>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>个人消费</li>
              <li>单房差</li>
              <li>行程中未提及的费用</li>
              <li>因不可抗力因素产生的额外费用</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 预订须知 */}
      <div>
        <h3 className="text-xl font-semibold mb-4">预订须知</h3>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <div className="space-y-2 text-sm text-yellow-800">
            <p>• 请提前至少7天预订</p>
            <p>• 参团后不可随意退出，特殊情况需联系客服</p>
            <p>• 拼团成功后统一出票，失败则全额退款</p>
            <p>• 出行前7天可免费取消，7天内取消需收取一定手续费</p>
            <p>• 如遇不可抗力因素导致行程变更，将提前通知</p>
            <p>• 请确保个人信息填写准确，以免影响出行</p>
          </div>
        </div>
      </div>
    </div>
  )
}