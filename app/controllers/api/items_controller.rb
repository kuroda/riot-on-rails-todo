class Api::ItemsController < ApplicationController
  def index
    @items = Item.order(id: :desc)
  end

  def create
    if Item.create(item_params)
      render text: 'OK'
    else
      render text: 'NG'
    end
  end

  def update
    item = Item.find(params[:id])
    if item.update_attributes(item_params)
      render text: 'OK'
    else
      render text: 'NG'
    end
  end

  def destroy
    item = Item.find(params[:id])
    item.destroy
    render text: 'OK'
  end

  private
  def item_params
    params.require(:item).permit(:name, :done)
  end
end
