'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Booking {
  id: string;
  source: 'calendly' | 'cal' | 'manual';
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  service: string;
  date: string;
  time: string;
  duration: number;
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
  price?: number;
  notes?: string;
  createdAt: string;
}

export default function BookingManagementPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past' | 'cancelled'>('all');
  const [loading, setLoading] = useState(true);

  // Mock data - in production, this would fetch from your database
  useEffect(() => {
    const mockBookings: Booking[] = [
      {
        id: '1',
        source: 'calendly',
        customerName: 'Maria Rossi',
        customerEmail: 'maria@example.com',
        customerPhone: '+39 333 1234567',
        service: 'Hair Cut & Style',
        date: '2025-01-22',
        time: '10:00',
        duration: 60,
        status: 'confirmed',
        price: 45,
        notes: 'First time customer',
        createdAt: '2025-01-19T08:30:00Z',
      },
      {
        id: '2',
        source: 'cal',
        customerName: 'Giovanni Bianchi',
        customerEmail: 'giovanni@example.com',
        customerPhone: '+39 334 5678901',
        service: 'Deep Cleaning',
        date: '2025-01-23',
        time: '14:30',
        duration: 180,
        status: 'confirmed',
        price: 150,
        notes: '3 bedroom apartment',
        createdAt: '2025-01-18T15:45:00Z',
      },
      {
        id: '3',
        source: 'manual',
        customerName: 'Anna Verdi',
        customerEmail: 'anna@example.com',
        service: 'Massage Therapy',
        date: '2025-01-20',
        time: '16:00',
        duration: 90,
        status: 'completed',
        price: 80,
        createdAt: '2025-01-15T11:20:00Z',
      },
    ];

    setTimeout(() => {
      setBookings(mockBookings);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status: Booking['status']) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getSourceIcon = (source: Booking['source']) => {
    switch (source) {
      case 'calendly':
        return '📅';
      case 'cal':
        return '🗓️';
      case 'manual':
        return '📝';
      default:
        return '📋';
    }
  };

  const filteredBookings = bookings.filter(booking => {
    const bookingDate = new Date(booking.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    switch (filter) {
      case 'upcoming':
        return bookingDate >= today && booking.status !== 'cancelled';
      case 'past':
        return bookingDate < today || booking.status === 'completed';
      case 'cancelled':
        return booking.status === 'cancelled';
      default:
        return true;
    }
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Booking Management</h1>
            <Button className="bg-amber-600 hover:bg-amber-700 text-white">
              Export Bookings
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-6">
            <div className="text-2xl font-bold text-gray-900">
              {bookings.filter(b => b.status === 'confirmed').length}
            </div>
            <div className="text-sm text-gray-600">Confirmed Bookings</div>
          </Card>
          <Card className="p-6">
            <div className="text-2xl font-bold text-gray-900">
              €{bookings.reduce((sum, b) => sum + (b.price || 0), 0)}
            </div>
            <div className="text-sm text-gray-600">Total Revenue</div>
          </Card>
          <Card className="p-6">
            <div className="text-2xl font-bold text-gray-900">
              {bookings.filter(b => new Date(b.date) >= new Date()).length}
            </div>
            <div className="text-sm text-gray-600">Upcoming</div>
          </Card>
          <Card className="p-6">
            <div className="text-2xl font-bold text-gray-900">
              {bookings.filter(b => b.status === 'cancelled').length}
            </div>
            <div className="text-sm text-gray-600">Cancelled</div>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-6">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            onClick={() => setFilter('all')}
            className={filter === 'all' ? 'bg-amber-600 hover:bg-amber-700' : ''}
          >
            All Bookings
          </Button>
          <Button
            variant={filter === 'upcoming' ? 'default' : 'outline'}
            onClick={() => setFilter('upcoming')}
            className={filter === 'upcoming' ? 'bg-amber-600 hover:bg-amber-700' : ''}
          >
            Upcoming
          </Button>
          <Button
            variant={filter === 'past' ? 'default' : 'outline'}
            onClick={() => setFilter('past')}
            className={filter === 'past' ? 'bg-amber-600 hover:bg-amber-700' : ''}
          >
            Past
          </Button>
          <Button
            variant={filter === 'cancelled' ? 'default' : 'outline'}
            onClick={() => setFilter('cancelled')}
            className={filter === 'cancelled' ? 'bg-amber-600 hover:bg-amber-700' : ''}
          >
            Cancelled
          </Button>
        </div>

        {/* Bookings Table */}
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Source
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Service
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-2xl" title={booking.source}>
                        {getSourceIcon(booking.source)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {booking.customerName}
                        </div>
                        <div className="text-sm text-gray-500">{booking.customerEmail}</div>
                        {booking.customerPhone && (
                          <div className="text-sm text-gray-500">{booking.customerPhone}</div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{booking.service}</div>
                      <div className="text-sm text-gray-500">{booking.duration} min</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {new Date(booking.date).toLocaleDateString()}
                      </div>
                      <div className="text-sm text-gray-500">{booking.time}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge className={getStatusColor(booking.status)}>
                        {booking.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {booking.price ? `€${booking.price}` : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <Button
                        variant="outline"
                        size="sm"
                        className="mr-2"
                        onClick={() => console.log('View booking:', booking.id)}
                      >
                        View
                      </Button>
                      {booking.status === 'confirmed' && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600 hover:text-red-700"
                          onClick={() => console.log('Cancel booking:', booking.id)}
                        >
                          Cancel
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Integration Status */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Integration Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Calendly</h3>
                  <p className="text-sm text-gray-600">Webhook endpoint ready</p>
                </div>
                <Badge className="bg-green-100 text-green-800">Active</Badge>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Cal.com</h3>
                  <p className="text-sm text-gray-600">Webhook endpoint ready</p>
                </div>
                <Badge className="bg-green-100 text-green-800">Active</Badge>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Email Notifications</h3>
                  <p className="text-sm text-gray-600">Configure email service</p>
                </div>
                <Badge className="bg-yellow-100 text-yellow-800">Setup Required</Badge>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}